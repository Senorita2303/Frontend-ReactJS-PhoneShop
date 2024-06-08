import { useState, useCallback } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
// import { paths } from 'src/routes/paths';
// _mock
// import { _userAbout, _userPlans, _userPayment, _userInvoices, _userAddressBook } from '../../../_mock';
// components
import Iconify from '../../../component/iconify';
import { useSettingsContext } from '../../../component/settings/context';
import CustomBreadcrumbs from '../../../component/custom-breadcrumbs';
//
// import AccountGeneral from '../AccountGeneral';
// import AccountBilling from '../AccountBilling';
// import AccountSocialLinks from '../AccountSocialLinks';
// import AccountNotifications from '../AccountNotifications';
// import AccountChangePassword from '../AccountChangePassword';

// ----------------------------------------------------------------------

const TABS = [
    {
        value: 'general',
        label: 'General',
        icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
        value: 'billing',
        label: 'Billing',
        icon: <Iconify icon="solar:bill-list-bold" width={24} />,
    },
    // {
    //   value: 'notifications',
    //   label: 'Notifications',
    //   icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
    // },
    // {
    //   value: 'social',
    //   label: 'Social links',
    //   icon: <Iconify icon="solar:share-bold" width={24} />,
    // },
    {
        value: 'security',
        label: 'Security',
        icon: <Iconify icon="ic:round-vpn-key" width={24} />,
    },
];

// ----------------------------------------------------------------------

export default function AccountView() {
    const settings = useSettingsContext();

    const [currentTab, setCurrentTab] = useState('genera');

    const handleChangeTab = useCallback((event, newValue) => {
        setCurrentTab(newValue);
    }, []);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="My Account"
                // links={[
                //     { name: 'Dashboard', href: paths.dashboard.root },
                //     // { name: 'User', href: paths.dashboard.user.root },
                //     { name: 'Account' },
                // ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />

            <Tabs
                value={currentTab}
                onChange={handleChangeTab}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            >
                {TABS.map((tab) => (
                    <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                ))}
            </Tabs>

            {/* {currentTab === 'general' && <AccountGeneral />} */}

            {/* {currentTab === 'billing' && (
                <AccountBilling
                    plans={_userPlans}
                    cards={_userPayment}
                    invoices={_userInvoices}
                    addressBook={_userAddressBook}
                />
            )} */}

            {/* {currentTab === 'notifications' && <AccountNotifications />}

      {currentTab === 'social' && <AccountSocialLinks socialLinks={_userAbout.socialLinks} />} */}

            {/* {currentTab === 'security' && <AccountChangePassword />} */}
        </Container>
    );
}