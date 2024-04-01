import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { toyService } from '../services/toy.service';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const labelsOpt = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
  'Outdoor', 'Battery Powered']


export function MultiSelect({ onSetLabel, toyToEdit }) {
  const [labels, setLabels] = useState([...toyToEdit.labels])

  useEffect(()=>{
    onSetLabel(labels)
  },[labels])
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLabels(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
    

  }
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">label</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={labels}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{ border: 'non' }}
          color="success"
        >
          {labelsOpt.map((label) => (
            <MenuItem
              key={label}
              value={label}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
