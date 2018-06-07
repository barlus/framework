import * as React from '@barlus/react'
import { classes } from '../utils/classes'

const Link = ({ active, children, setFilter }) => (
    <a
        className={classes({ selected: active })}
        style={{ cursor: 'pointer' }}
        onClick={() => setFilter()}
    >
        {children}
    </a>
);

export default Link
