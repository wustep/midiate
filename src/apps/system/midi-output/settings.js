import React, { useCallback, useState } from 'react'
import Slider from '@material-ui/core/Slider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import UsbIcon from '@material-ui/icons/Usb'
import { useSetting } from '../../../api/settings'
import { useMidiOutputs } from '../../../api/midi'

export default React.memo(function MidiOutput() {
  const midiOutputs = useMidiOutputs()
  const [activeOutputs, setActiveOutputs] = useSetting('activeOutputs', [])

  const toggleMidiOutput = useCallback((output) => {
    const newOutputs = [...activeOutputs]
    if (newOutputs.indexOf(output.id) !== -1) {
      newOutputs.splice(output.id, 1)
    } else {
      newOutputs.push(output.id)
    }
    setActiveOutputs(newOutputs)
  }, [activeOutputs])

	return (
    <React.Fragment>
      <List>
        <ListSubheader>MIDI Outputs</ListSubheader>
        {midiOutputs.length === 0 
          && <ListItem><i>no output devices found</i></ListItem>}
        {midiOutputs.map(output => (
          <ListItem key={output.id} button
              onClick={() => toggleMidiOutput(output)}
            >
            <ListItemIcon>
              <UsbIcon />
            </ListItemIcon>
            <ListItemText primary={output.name} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={() => toggleMidiOutput(output)}
                checked={activeOutputs.indexOf(output.id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      <TransposeControl />
      </List>
    </React.Fragment>
	)
})

const TransposeControl = React.memo(function () {
  const [transpose, setTranspose] = useSetting('transpose', 0)
  const [interTranspose, setInterTranspose] = useState(transpose)
  const onTransposeChange = useCallback(
    (e, v) => setInterTranspose(v),
    [setInterTranspose])
  const onTransposeChangeCommit = useCallback(
    (e, v) => setTranspose(interTranspose),
    [setTranspose, interTranspose])

  return (
    <React.Fragment>
      <ListSubheader>Transpose MIDI Outputs</ListSubheader>
      <ListItem>
        <Slider
          value={interTranspose}
          step={0.5}
          marks
          min={-3}
          max={3}
          valueLabelDisplay="auto"
          onChange={onTransposeChange}
          onChangeCommitted={onTransposeChangeCommit}
        />
      </ListItem>
    </React.Fragment>
  )
})
