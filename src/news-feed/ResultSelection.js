import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


// ResultSelection: This section is mainly responsible for the selection of results per page.


const ResultSelection = ({ images, handleResultsChange }) => (
  <FormGroup>
    <Label for="resultsPerPage">Results per page</Label>
    <Input type="select" id="resultsPerPage" onChange={handleResultsChange}>
      <option value={images.length}>All</option>
      <option>3</option>
      <option>5</option>
      <option>10</option>
    </Input>
  </FormGroup>
);

export default ResultSelection;


