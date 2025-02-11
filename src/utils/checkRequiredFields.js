

function checkRequiredFields(requiredFields, data) {
    for (let field of requiredFields) {
      if (!data[field]) {
        return `${field} is required.`;
      }
    }
    return null;
  }
  
  export default checkRequiredFields;
  