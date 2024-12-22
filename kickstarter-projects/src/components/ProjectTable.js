import React, { useEffect, useState } from "react";
import { fetchKickstarterProjects } from "../dataService";
import "./ProjectTable.css";

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchKickstarterProjects();
      setProjects(data);
    };
    loadProjects();
  }, []);

  const totalPages = Math.ceil(projects?.length / recordsPerPage);

  const getPaginatedData = () => {
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    return projects?.slice(start, end);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="table-container">
      <table className="project-table" role="table">
        <thead>
          <tr>
            <th role="columnheader">S.No.</th>
            <th role="columnheader">Percentage Funded</th>
            <th role="columnheader">Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData()?.map((project, index) => (
            <tr key={index} role="row">
              <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
              <td>{Math.round(project["percentage.funded"])}</td>
              <td>{project["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectTable;
