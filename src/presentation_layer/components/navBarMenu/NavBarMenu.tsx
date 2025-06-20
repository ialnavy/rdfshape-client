import { Button, Menu, MenuItem } from '@mui/material';
import { Children, useState } from 'react';

import { INavBarMenu } from './INavBarMenu';


let NavBarMenu: React.FC<INavBarMenu> = ({
    buttonText,
    menuId,
    buttonClassName,
    children
}) => {
    let [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    let handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    let handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                className={buttonClassName}
                aria-controls={Boolean(anchorEl) ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={'\u2261'}
            >
                {buttonText}
            </Button>
            <Menu
                id={menuId}
                elevation={0}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {Children.map(children, (child) => (
                    <MenuItem onClick={handleClose} disableRipple>
                        {child}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default NavBarMenu;
