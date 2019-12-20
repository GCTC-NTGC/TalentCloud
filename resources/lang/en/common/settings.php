<?php
/*
| --------------------------------------------------------------------------
| Settings Language Lines
| --------------------------------------------------------------------------
|
| The following language lines are used in the Settings page
*/
return [
     'title' => 'Account Settings',
     'home_text' => 'Home',
     'home_title' => 'Return to the homepage.',
     'sidebar_title' => 'Settings',
     'heading' => [
        'personal' => 'Personal Information',
        'government' => 'Government of Canada Information',
        'password' => 'Password',
        'two_factor' => 'Two-factor Authentication',
     ],
     'personal_copy' => 'This information is used to identify you on the platform.',
     'required' => 'Required',
     'error' => 'This input has an error.',
     'first_name_label' => 'First Name',
     'last_name_label' => 'Last Name',
     'email_label' => 'Username/Email',
     'personal_save' => 'Save Personal Information',
     'government_copy' => 'This information is used to identify your role within the Government of Canada on the manager and HR advisor portals.',
     'government_dept' => 'Current department:',
     'no_department' => 'N/A (not in government)',
     'dept_change_copy' => [
        'one' => 'In order to change your department, you\'ll need to ',
        'two' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
        'three' => 'contact Talent Cloud directly',
        'four' => 'contact Talent Cloud directly', // repeats in title attribute
        'five' => 'We require you to get in touch because your department determines how you interact with job posters, applicants, and HR advisers. In order to have this information changed, we need to verify your department independently of the platform.',

     ],
     'gov_email_label' => 'Government Email',
     'government_save' => 'Save Government Information',
     'password_copy' => [
        'one' => 'You can use this section to change your password. Passwords must contain 1 character from each of the following criteria:',
        'two' => 'Lower-case characters (a-z)',
        'three' => 'Upper-case characters (A-Z)',
        'four' => 'Digits (0-9)',
        'five' => 'Non-alphanumeric symbols (%, $, !, etc.)',
     ],
     'password_label' => 'Current Password',
     'new_password_label' => 'New Password',
     'confirm_password_label' => 'Confirm New Password',
     'password_save' => 'Submit New Password',
     'two_factor_legend' => 'Two-factor Authentication',
     'two_factor_button_text' => 'Set up Two-factor Authentication',
     'two_factor_recovery_legend' => 'Recovery Codes',
     'two_factor_recovery_text' => 'Emergency recovery codes let you gain access to your account in case you lose access to your phone. For security, we only show them to you once, but you can',
     'view_recovery_codes' => 'generate new codes',
     'two_factor_inactive' => [
        'one' => 'Even a strong password isn\'t enough to protect your account. If you use the same password on different websites, click on hyperlinks in email messages, or download anything on the internet, you are at risk of having your password stolen. And if someone else gets access to your account, they can do all kinds of bad things.',
        'two' => 'Using two-factor authentication (2FA) adds an extra layer of security when you sign into Talent Cloud. To use 2FA, you\'ll have to install an authenticator app that uses the time-based one-time password algorithm standard on a separate device, like your cell phone. Compatible applications include:',
        'three' => '1Password for iOS, Android, OS X, Windows',
        'four' => 'Authy for iOS, Android, Chrome, OS X',
        'five' => 'FreeOTP for iOS, Android and Pebble',
        'six' => 'Google Authenticator for iOS',
        'seven' => 'Google Authenticator for Android',
        'eight' => 'Google Authenticator (port) on Windows Store',
        'nine' => 'LastPass Authenticator for iOS, Android, OS X',
        'ten' => 'Windows Microsoft Authenticator for Windows Phone',
        'eleven' => 'To turn on 2FA, you need to associate your phone (or some other device) with your Talent Cloud account by scanning a QR code. This will give you the ability to generate a one-time password on demand when you log in. Once you use 2FA, you won\'t have to use it again for another 30 days on that device. (You\'ll still need to enter your user name and password.)'
     ],
     'two_factor_active' => 'You\'re currently receiving verification codes via an authenticator application on your smartphone.',
     'two_factor_deactivate' => 'Deactivate Two-factor Authentication',
     'two_factor_status' => 'Status:',
     'two_factor_on' => 'On',
     'two_factor_off' => 'Off',
     'forget_remembered_devices' => 'Forget all trusted devices.',
     'success_title' => 'All good in the hood.'
];
