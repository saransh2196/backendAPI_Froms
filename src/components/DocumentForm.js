import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const DocumentForm = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [author, setAuthor] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const formatedStart = moment(start).format("YYYY-DD-MM").toString();
  const formatedEnd = moment(end).format("YYYY-DD-MM").toString();

  const handleSaveDocument = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("author", author);
      formData.append("start", formatedStart);
      formData.append("end", formatedEnd);
      formData.append("file", file);

      const config = {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post("http://localhost:3000/api/documents", formData, config);
      alert("Document saved successfully.");
      setName("");
      setDescription("");
      setType("");
      setAuthor("");
      setStart("");
      setEnd("");
      setFile(null);
    } catch (error) {
      console.error("Save document error:", error);
    }
  };

  return (
    <div>
      <h2>Save a New Document</h2>
      <form onSubmit={handleSaveDocument}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <div>
          <label>Upload File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Save Document</button>
      </form>
    </div>
  );
};

export default DocumentForm;
