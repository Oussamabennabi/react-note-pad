import React, { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { Note, Tag } from "../types";

type NoteFormProps = {
  onSubmit: (data: Note) => void;
  onAddTag: (data: Tag) => void;
  availableTags: Tag[];
} & Partial<Note>;

const NoteForm = ({
  onSubmit,
  availableTags,
  onAddTag,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      id: uuidV4(),
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  }

  return (
    <Form className="mx-4 " onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control defaultValue={title} required ref={titleRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                onCreateOption={(label: string) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>

        <Col>
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control
              defaultValue={markdown}
              rows={10}
              required
              ref={markdownRef}
              as="textarea"
            />
          </Form.Group>
        </Col>

        <Stack direction="horizontal" gap={4} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to={".."}>
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
