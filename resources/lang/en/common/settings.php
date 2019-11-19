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
     'two_factor_recovery_text' => 'Your emergency recovery codes let you gain access to your account in case you lose access to your phone. For security, we only show them to you once, but you can',
     'view_recovery_codes' => 'generate new codes',
     'two_factor_inactive' => 'Two-factor authentication helps protect your account by adding a second layer of security beyond your username and password. Talent Cloud implements this second layer using a standard that asks for a one-time password when you log into the site. These one-time passwords are set up through applications such as Google Authenticator or Authy, and provide you with the ability to generate the one-time password on demand.',
     'two_factor_active' => 'You\'re currently receiving verification codes via an authenticator application on your smartphone.',
     'two_factor_deactivate' => 'Deactivate Two-factor Authentication',
     'two_factor_status' => 'Status:',
     'two_factor_on' => 'On',
     'two_factor_off' => 'Off',
     'expand_hidden' => 'Click to view...'
];
