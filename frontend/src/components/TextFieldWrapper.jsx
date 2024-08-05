import React, { forwardRef } from 'react';

import TextField from '@mui/material/TextField';

// Forward the ref to the TextField component
const TextFieldWrapper = forwardRef((props, ref) => (
  <TextField {...props} inputRef={ref} />
));

export default TextFieldWrapper;