import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  // key,
  quotationId,
  selected,
  quotationNo,
  name,
  terms, 
  amount,
  discount,
  // handleClick,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography sx={{ m: 2 }} variant="subtitle2" noWrap>
              {`   ${quotationNo}`}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{terms}</TableCell>
        <TableCell>{amount}</TableCell>
        <TableCell>{discount}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => { navigate(`/quotation/${quotationId}`)}}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => { navigate(`/generate/document/${quotationId}`)}} sx={{ color: 'success.main' }}>
          <Iconify icon="eva:printer-fill" sx={{ mr: 2 }} />
          Print
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  // key: PropTypes.any,
  quotationId: PropTypes.any,
  quotationNo: PropTypes.any,
  terms: PropTypes.any,
  amount: PropTypes.any,
  discount: PropTypes.any,
  name: PropTypes.any,
  // handleClick: PropTypes.any,
  selected: PropTypes.any
};
