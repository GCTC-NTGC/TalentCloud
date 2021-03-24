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
        'delete' => 'Delete Account'
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
        'five' => 'We require you to get in touch because your department determines how you interact with job posters, applicants, and HR advisors. In order to have this information changed, we need to verify your department independently of the platform.',

     ],
    'gov_email_label' => 'Government Email',
    'government_save' => 'Save Government Information',
    'contact_preferences' => 'Contact Preferences',
    'contact_preferences_copy' => 'Below are a few preferences for how Talent Cloud communicated with you:',
    'contact_language_label' => 'Which language would you prefer to be contacted in?',
    'contact_language_null_selection' => 'Select a language...',
    'contact_languages' => [
    'en' => 'English',
    'fr' => 'French',
    ],
    'job_alerts_copy' => 'By default, Talent Cloud will occasionally contact you about opportunities that are similar to those that you apply to. If you would like to opt out of these communication emails, please check the box below.',
    'job_alerts_label' => 'I do not want Talent Cloud to contact me about jobs related to the ones I apply to.',
    'save_contact_preferences' => 'Save Contact Preferences',
    'gov_email_label' => 'Government Email',
    'government_save' => 'Save Government Information',
    'password_copy' => [
        'one' => 'You can use this section to change your password. The new password must be at least 9 characters and may not be greater than 100 characters. Passwords must contain 1 character from each of the following criteria:',
        'two' => 'Lower-case characters (a-z)',
        'three' => 'Upper-case characters (A-Z)',
        'four' => 'Digits (0-9)',
        'five' => 'Non-alphanumeric symbols (%, $, !, etc.)',
    ],
    'password_label' => 'Current Password',
    'new_password_label' => 'New Password',
    'confirm_password_label' => 'Confirm New Password',
    'password_save' => 'Submit New Password',
    'show_password' => 'Show Password',
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
    'success_title' => 'All good.',
    'danger_zone' => 'Danger zone!',
    'delete_copy_1' => 'Please note that your Talent Cloud account and profile information is about to be permanently deleted. If you want to apply to a job here in the future, you will have to register again.',
    'delete_copy_2' => 'If you have already applied for a job, we are required to keep a copy of that application for 5 years after which it will be deleted.',
    'delete_alert_prefix' => 'Enter your email address',
    'delete_alert_suffix' => 'below to confirm you want to permanently delete your Talent Cloud account.',
    'confirm_delete_label' => 'Confirm account deletion',
    'delete_placeholder' => 'Type your email address to activate the delete button.',
    'delete_button' => 'Delete Account'
];
