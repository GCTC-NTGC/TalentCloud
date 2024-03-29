<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages.
    |
    | Translation taken from https://github.com/caouecs/Laravel-lang
    |
    */
    'accepted'             => 'Le champ :attribute doit être accepté.',
    'active_url'           => "Le champ :attribute n'est pas une URL valide.",
    'after'                => 'Le champ :attribute doit être une date après au :date.',
    'after_or_equal'       => 'Le champ :attribute doit être une date après ou égale au :date.',
    'alpha'                => 'Le champ :attribute doit contenir uniquement des lettres.',
    'alpha_dash'           => 'Le champ :attribute doit contenir uniquement des lettres, des chiffres et des tirets.',
    'alpha_num'            => 'Le champ :attribute doit contenir uniquement des chiffres et des lettres.',
    'array'                => 'Le champ :attribute doit être un tableau.',
    'before'               => 'Le champ :attribute doit être une date antérieure au :date.',
    'before_or_equal'      => 'Le champ :attribute doit être une date antérieure ou égale au :date.',
    'between'              => [
        'numeric' => 'La valeur de :attribute doit être comprise entre :min et :max.',
        'file'    => 'La taille du fichier de :attribute doit être comprise entre :min et :max kilo-octets.',
        'string'  => 'Le texte :attribute doit contenir entre :min et :max caractères.',
        'array'   => 'Le tableau :attribute doit contenir entre :min et :max éléments.',
    ],
    'boolean'              => 'Le champ :attribute doit être vrai ou faux.',
    'confirmed'            => 'Le champ de confirmation :attribute ne correspond pas.',
    'date'                 => "Le champ :attribute n'est pas une date valide.",
    'date_format'          => 'Le champ :attribute ne correspond pas au format :format.',
    'different'            => 'Les champs :attribute et :other doivent être différents.',
    'digits'               => 'Le champ :attribute doit contenir :digits chiffres.',
    'digits_between'       => 'Le champ :attribute doit contenir entre :min et :max chiffres.',
    'dimensions'           => "La taille de l'image :attribute n'est pas conforme.",
    'distinct'             => 'Le champ :attribute a une valeur en double.',
    'email'                => 'Le champ :attribute doit être une adresse courriel valide.',
    'exists'               => 'Le champ :attribute sélectionné est invalide.',
    'file'                 => 'Le champ :attribute doit être un fichier.',
    'filled'               => 'Le champ :attribute doit avoir une valeur.',
    'gt'                   => [
        'numeric' => 'La valeur de :attribute doit être supérieure à :value.',
        'file'    => 'La taille du fichier de :attribute doit être supérieure à :value kilo-octets.',
        'string'  => 'Le texte :attribute doit contenir plus de :value caractères.',
        'array'   => 'Le tableau :attribute doit contenir plus de :value éléments.',
    ],
    'gte'                  => [
        'numeric' => 'La valeur de :attribute doit être supérieure ou égale à :value.',
        'file'    => 'La taille du fichier de :attribute doit être supérieure ou égale à :value kilo-octets.',
        'string'  => 'Le texte :attribute doit contenir au moins :value caractères.',
        'array'   => 'Le tableau :attribute doit contenir au moins :value éléments.',
    ],
    'image'                => 'Le champ :attribute doit être une image.',
    'in'                   => 'Le champ :attribute est invalide.',
    'in_array'             => "Le champ :attribute n'existe pas dans :other.",
    'integer'              => 'Le champ :attribute doit être un entier.',
    'ip'                   => 'Le champ :attribute doit être une adresse IP valide.',
    'ipv4'                 => 'Le champ :attribute doit être une adresse IPv4 valide.',
    'ipv6'                 => 'Le champ :attribute doit être une adresse IPv6 valide.',
    'json'                 => 'Le champ :attribute doit être un document JSON valide.',
    'lt'                   => [
        'numeric' => 'La valeur de :attribute doit être inférieure à :value.',
        'file'    => 'La taille du fichier de :attribute doit être inférieure à :value kilo-octets.',
        'string'  => 'Le texte :attribute doit contenir moins de :value caractères.',
        'array'   => 'Le tableau :attribute doit contenir moins de :value éléments.',
    ],
    'lte'                  => [
        'numeric' => 'La valeur de :attribute doit être inférieure ou égale à :value.',
        'file'    => 'La taille du fichier de :attribute doit être inférieure ou égale à :value kilo-octets.',
        'string'  => 'Le texte :attribute doit contenir au plus :value caractères.',
        'array'   => 'Le tableau :attribute doit contenir au plus :value éléments.',
    ],
    'max'                  => [
        'numeric' => 'La valeur de :attribute ne peut être supérieure à :max.',
        'file'    => 'La taille du fichier de :attribute ne peut pas dépasser :max kilo-octets.',
        'string'  => 'Le texte de :attribute ne peut contenir plus de :max caractères.',
        'array'   => 'Le tableau :attribute ne peut contenir plus de :max éléments.',
    ],
    'mimes'                => 'Le champ :attribute doit être un fichier de type : :values.',
    'mimetypes'            => 'Le champ :attribute doit être un fichier de type : :values.',
    'min'                  => [
        'numeric' => 'La valeur de :attribute doit être supérieure ou égale à :min.',
        'file'    => 'La taille du fichier de :attribute doit être supérieure à :min kilo-octets.',
        'string'  => 'Le texte :attribute doit contenir au moins :min caractères.',
        'array'   => 'Le tableau :attribute doit contenir au moins :min éléments.',
    ],
    'not_in'               => "Le champ :attribute sélectionné n'est pas valide.",
    'not_regex'            => "Le format du champ :attribute n'est pas valide.",
    'numeric'              => 'Le champ :attribute doit contenir un nombre.',
    'present'              => 'Le champ :attribute doit être présent.',
    'regex'                => 'Le format du champ :attribute est invalide.',
    'required'             => 'Le champ :attribute est obligatoire.',
    'required_if'          => 'Le champ :attribute est obligatoire quand la valeur de :other est :value.',
    'required_unless'      => 'Le champ :attribute est obligatoire sauf si :other est :values.',
    'required_with'        => 'Le champ :attribute est obligatoire quand :values est présent.',
    'required_with_all'    => 'Le champ :attribute est obligatoire quand :values est présent.',
    'required_without'     => "Le champ :attribute est obligatoire quand :values n'est pas présent.",
    'required_without_all' => "Le champ :attribute est requis quand aucun de :values n'est présent.",
    'same'                 => 'Les champs :attribute et :other doivent être identiques.',
    'size'                 => [
        'numeric' => 'La valeur de :attribute doit être :size.',
        'file'    => 'La taille du fichier de :attribute doit être de :size kilo-octets.',
        'string'  => 'Le texte de :attribute doit contenir :size caractères.',
        'array'   => 'Le tableau :attribute doit contenir :size éléments.',
    ],
    'string'               => 'Le champ :attribute doit être une chaîne de caractères.',
    'timezone'             => 'Le champ :attribute doit être un fuseau horaire valide.',
    'unique'               => 'La valeur du champ :attribute est déjà utilisée.',
    'uploaded'             => "Le fichier du champ :attribute n'a pu être téléversé.",
    'url'                  => "Le format de l'URL de :attribute n'est pas valide.",

    /*
    |--------------------------------------------------------------------------
    | Custom Rule Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify validation messages for custom rules and validators.
    */
    'applicant_has_relation' => 'le candidat doit posséder cet :attribute',
    'contains_object_with_attribute' => ':attribute ne contient pas la :relation egal à :attributeValue',
    'includes_all' => 'Il manque la valeur obligatoire pour :attribute',
    'user_skill_unique' => 'cette compétence est déjà ajoutée',
    'password_correct' => 'Le mot de passe actuel n\'est pas correct',
    'user_owns_skill_declaration' => ':attribute doit spécifier une déclaration de compétence qui appartient à l\' utilisateur actuel',
    'invalid_id' => ":attribute n'est pas un identifiant valide.",
    'job_unpublished' => 'Impossible de mettre à jour une offre d\'emploi qui a été mise en ligne.',


    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */
    'custom' => [
        'password' => 'Le mot de passe doit contenir un caractère appartenant à chacun des catégories suivantes: minuscules (az), majuscules (AZ), chiffres (0-9) et symboles non alphanumériques (%, $,!, etc.). ',
        'experience_saved' => [
            'accepted' => ' Vous devez revoir et sauvegarder l \'étape 2.',
        ],
        'application_step_1' => [
            'accepted' => 'L\'étape 1 doit être complétée',
        ],
        'application_step_3' => [
            'accepted' => 'L\'étape 3 doit être complet. Si l\'étape 3 semble complet, veuillez consulter la page de compétences de votre profil pour les compétences en double. Des copies multiples d\'une compétence sur votre profil peut également provoquer cette erreur. Nous travaillons pour résoudre ce problème.',
        ],
        'timeline_step_1' => [
            'accepted' => 'L\'étape 1 doit être complétée',
        ],
        'timeline_step_2' => [
            'accepted' => 'L\'étape 2 doit être complétée',
        ],
        'timeline_step_3' => [
            'accepted' => 'L\'étape 3 doit être complétée',
        ],
        'timeline_step_4' => [
            'accepted' => 'L\'étape 4 doit être complétée',
        ],
        'timeline_step_5' => [
            'accepted' => 'L\'étape 5 doit être complétée',
        ],
        'twitter_handle' => 'Ce n\'est pas une poignée Twitter valide.',
        'linkedin_url' => 'Ce n\'est pas une url linkedIn valide.',
        'job_poster_question' => [
            'required' => 'Le champ de la question doit être rempli.',
            'string' => 'Le champ question doit être du texte.'
        ],
        'word_limit' => 'La description doit contenir moins de :max_words mots.',
        'website' => [
            'size' => 'Votre soumission semble avoir été remplie par un robot ! Ne remplissez que les champs obligatoires.',
        ],
    ],
    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */
    'attributes' => [
        'submission_signature' => 'signature',
        'submission_date'       => 'date',
        'skill_declaration_id'  => 'déclaration de compétence',
        'name'                  => 'nom',
        'username'              => "nom d'utilisateur",
        'email'                 => 'adresse courriel',
        'first_name'            => 'prénom',
        'last_name'             => 'nom',
        'password'              => 'mot de passe',
        'password_confirmation' => 'confirmation du mot de passe',
        'new_password'          => 'nouveau du mot de passe',
        'new_password_confirmation' => 'confirmation du nouveau mot de passe',
        'city'                  => 'ville',
        'country'               => 'pays',
        'address'               => 'adresse',
        'phone'                 => 'téléphone',
        'mobile'                => 'portable',
        'age'                   => 'âge',
        'sex'                   => 'sexe',
        'gender'                => 'genre',
        'day'                   => 'jour',
        'month'                 => 'mois',
        'year'                  => 'année',
        'hour'                  => 'heure',
        'minute'                => 'minute',
        'second'                => 'seconde',
        'title'                 => 'titre',
        'content'               => 'contenu',
        'description'           => 'description',
        'excerpt'               => 'extrait',
        'date'                  => 'date',
        'time'                  => 'heure',
        'available'             => 'disponible',
        'size'                  => 'taille',
        'courses.new.*.name' => 'nom du cours ou de la certification',
        'courses.new.*.institution' => 'institution du cours ou de la certification',
        'courses.new.*.course_status_id' => 'statut du cours ou de la certification',
        'courses.new.*.start_date' => 'début du cours ou de la certification',
        'courses.new.*.end_date' => 'fin du cours ou de la certification',
        'degrees.new.*.degree_type_id' => 'type de diplôme',
        'degrees.new.*.area_of_study' => 'domaine d\'étude du diplôme',
        'degrees.new.*.institution' => 'institution du diplôme',
        'degrees.new.*.start_date' => 'début du diplôme',
        'degrees.new.*.end_date' => 'fin du diplôme',
        'work_experiences.new.*.role' => 'rôle pour expérience équivalente',
        'work_experiences.new.*.company' => 'entreprise ou groupe pour expérience équivalente',
        'work_experiences.new.*.description' => 'description pour expérience équivalente ',
        'work_experiences.new.*.start_date' => 'début de l\'expérience équivalente',
        'work_experiences.new.*.end_date' => 'fin de l\'expérience équivalente',
    ],
];
