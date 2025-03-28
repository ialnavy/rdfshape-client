import { Box } from "@mui/material";


export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    tabIndex: number;
}

export let a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

let CustomTabPanel: React.FC<TabPanelProps> = ({ children, tabIndex, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={tabIndex !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {tabIndex === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default CustomTabPanel;
