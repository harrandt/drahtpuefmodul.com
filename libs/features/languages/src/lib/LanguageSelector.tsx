import { Button, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import React from 'react';
import { useTranslation } from 'react-i18next';

const countryCodes = ['de', 'en', 'nl'];

export function LanguageSelector() {
    const {
        i18n: { changeLanguage, language: currentLang },
    } = useTranslation();

    const getDisplayLangByCC = (countyCode: string) => {
        const regionNamesInEnglish = new Intl.DisplayNames([currentLang], { type: 'language' });
        return regionNamesInEnglish.of(countyCode);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                id="lang-btn"
                onClick={handleClick}
                variant="text"
                size="large"
                sx={{ color: 'white', paddingX: 0 }}
                startIcon={<LanguageIcon />}
            >
                {getDisplayLangByCC(currentLang)}
            </Button>
            <Menu id="lang-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                {countryCodes.map((cc) => (
                    <MenuItem
                        value={cc}
                        key={cc}
                        disabled={currentLang === cc}
                        onClick={() => {
                            changeLanguage(cc);
                            handleClose();
                        }}
                    >
                        {getDisplayLangByCC(cc)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
