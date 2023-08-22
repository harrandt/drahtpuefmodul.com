import { useTranslation } from 'react-i18next';

export const WireVisualizer = () => {
    const { t } = useTranslation();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 578 536">
            <g fill="none" fillRule="evenodd">
                <path
                    fill="#91A1AF"
                    stroke="#8F9FAE"
                    d="M379.8 67.5c44.44 0 60.56 4.6 76.8 13.3a90.37 90.37 0 0 1 37.6 37.6c8.7 16.24 13.3 32.36 13.3 76.8v141.6c0 44.44-4.6 60.56-13.3 76.8a90.37 90.37 0 0 1-37.6 37.6c-16.24 8.7-32.36 13.3-76.8 13.3H199.2c-44.44 0-60.56-4.6-76.8-13.3a90.37 90.37 0 0 1-37.6-37.6c-8.7-16.24-13.3-32.36-13.3-76.8V195.2c0-44.44 4.6-60.56 13.3-76.8a90.37 90.37 0 0 1 37.6-37.6c16.24-8.7 32.36-13.3 76.8-13.3Z"
                />
                <rect width="178" height="178" x="201.36" y="177.5" fill="#E99C78" stroke="#8F9FAE" rx="46" />
                <text fill="#8B4525" fontSize="24" fontWeight="bold">
                    <tspan x="217" y="274">
                        {t('COPPER CORE')}
                    </tspan>
                </text>
                <text fill="#4A535C" fontSize="24" fontWeight="bold">
                    <tspan x="118" y="379">
                        {t('LAYER')}
                    </tspan>
                    <tspan x="118" y="408">
                        {t('THICKNESS')}
                    </tspan>
                </text>
                <text fill="#000" fontSize="24" fontWeight="bold" transform="rotate(-90 25 265.5)">
                    <tspan x="-40.64" y="274">
                        {t('FRONT HEIGHT')}
                    </tspan>
                </text>
                <text fill="#000" fontSize="24" fontWeight="bold">
                    <tspan x="233.35" y="29">
                        {t('TOP WIDTH')}
                    </tspan>
                </text>
                <text fill="#000" fontSize="24" fontWeight="bold">
                    <tspan x="210.97" y="520">
                        {t('BOTTOM WIDTH')}
                    </tspan>
                </text>
                <text fill="#000" fontSize="24" fontWeight="bold" transform="rotate(90 555 266.5)">
                    <tspan x="478" y="275">
                        {t('BACK HEIGHT')}
                    </tspan>
                </text>
                <path
                    fill="#56616A"
                    fillRule="nonzero"
                    d="m291 67 7.06 13.97-6 .03.38 82.5 6-.03-6.94 14.03-7.06-13.97 6-.03-.38-82.5-6 .03L291 67Z"
                />
                <path
                    fill="#000"
                    fillRule="nonzero"
                    d="m524 67 7 14h-6v370h6l-7 14-7-14h6V81h-6l7-14ZM55 67l7 14h-6v370h6l-7 14-7-14h6V81h-6l7-14Zm24 421-14-7 14-7v6h409v-6l14 7-14 7v-6H79v6Zm7-430-14-7 14-7v6h409v-6l14 7-14 7v-6H86v6Z"
                />
                <path
                    fill="#56616A"
                    fillRule="nonzero"
                    d="m290.5 353.5 7.06 13.97-6 .02.38 81.5 6-.02L291 463l-7.06-13.97 6-.02-.38-81.5-6 .02 6.94-14.03ZM85 274l-14-7 14-7v6h102v-6l14 7-14 7v-6H85v6Zm309.05-15.9-.04 6 101 .8.04-6L509 266l-14.05 6.9.04-6-101-.8-.04 6L380 265l14.05-6.9Z"
                />
            </g>
        </svg>
    );
};
