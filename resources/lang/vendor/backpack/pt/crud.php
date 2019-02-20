<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Backpack Crud Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used by the CRUD interface.
    | You are free to change them to anything
    | you want to customize your views to better match your application.
    |
    */

    // Forms
    'save_action_save_and_new' => 'Guardar e adicionar item',
    'save_action_save_and_edit' => 'Guardar e editar este item',
    'save_action_save_and_back' => 'Guardar e voltar',
    'save_action_changed_notification' => 'Comportamento predefinido depois de gravar.',

    // Create form
    'add'                 => 'Adicionar',
    'back_to_all'         => 'Voltar à lista de ',
    'cancel'              => 'Cancelar',
    'add_a_new'           => 'Adicionar ',

    // Edit form
    'edit'                 => 'Editar',
    'save'                 => 'Gravar',

    // Revisions
    'revisions'            => 'Revisões',
    'no_revisions'         => 'Não foram encontradas revisões',
    'created_this'         => 'criou este',
    'changed_the'          => 'alterou este',
    'restore_this_value'   => 'Restaurou este valor',
    'from'                 => 'de',
    'to'                   => 'para',
    'undo'                 => 'Desfazer',
    'revision_restored'    => 'Revisão restaurada com sucesso',
    'guest_user'           => 'Convidado',

    // Translatable models
    'edit_translations' => 'EDITAR TRADUÇÕES',
    'language'          => 'Idioma',

    // CRUD table view
    'all'                       => 'Todos ',
    'in_the_database'           => 'na base de dados',
    'list'                      => 'Lista',
    'actions'                   => 'Acções',
    'preview'                   => 'Visualizar',
    'delete'                    => 'Apagar',
    'admin'                     => 'Administrar',
    'details_row'               => 'Isto é a linha de detalhes. Modifique conforme quiser.',
    'details_row_loading_error' => 'Houve um erro ao carregar os detalhes. Por favor tente novamente.',

    // Confirmation messages and bubbles
    'delete_confirm'                              => 'Tem a certeza que quer apagar este item?',
    'delete_confirmation_title'                   => 'Item apagado',
    'delete_confirmation_message'                 => 'O item foi apagado com sucesso.',
    'delete_confirmation_not_title'               => 'Não apagado',
    'delete_confirmation_not_message'             => 'Ocorreu um erro. O item pode não ter sido apagado.',
    'delete_confirmation_not_deleted_title'       => 'Não apagado',
    'delete_confirmation_not_deleted_message'     => 'Está tudo bem! O item não foi apagado.',

    // Bulk actions
    'bulk_no_entries_selected_title' => 'Nenhum item seleccionado',
    'bulk_no_entries_selected_message' => 'Por favor seleccione um ou mais itens para realizar uma acção em massa aos mesmos.',

    // Bulk confirmation
    'bulk_delete_are_you_sure' => 'Tem a certeza que quer apagar estes :number itens?',
    'bulk_delete_sucess_title' => 'Itens apagados',
    'bulk_delete_sucess_message' => ' itens foram apagados',
    'bulk_delete_error_title' => 'Ocorreu um erro ao apagar o item',
    'bulk_delete_error_message' => 'Um ou mais itens não puderam ser apagados',

    // Ajax errors
    'ajax_error_title' => 'Erro',
    'ajax_error_text'  => 'Erro ao carregar a página. Por favor actualize a página.',

    // DataTables translation
    'emptyTable'     => 'Sem dados disponíveis na tabela',
    'info'           => 'A mostrar _START_ a _END_ de _TOTAL_ itens',
    'infoEmpty'      => 'A mostrar 0 de 0 itens',
    'infoFiltered'   => '(filtrado de um total de _MAX_ itens)',
    'infoPostFix'    => '',
    'thousands'      => ',',
    'lengthMenu'     => '_MENU_ itens por página',
    'loadingRecords' => 'A carregar...',
    'processing'     => 'A processar...',
    'search'         => 'Procurar: ',
    'zeroRecords'    => 'Nenhum item encontrado',
    'paginate'       => [
        'first'    => 'Primeiro',
        'last'     => 'Último',
        'next'     => 'Seguinte',
        'previous' => 'Anterior',
    ],
    'aria' => [
        'sortAscending'  => ': activar para colocar por ordem ascendente',
        'sortDescending' => ': activar para colocar por ordem descendente',
    ],
    'export' => [
        'export'            => 'Exportar',
        'copy'              => 'Copiar',
        'excel'             => 'Excel',
        'csv'               => 'CSV',
        'pdf'               => 'PDF',
        'print'             => 'Imprimir',
        'column_visibility' => 'Colunas visíveis',
    ],

    // global crud - errors
    'unauthorized_access' => 'Acesso não autorizado - não tem as permissões necessárias para ver esta página.',
    'please_fix' => 'Por favor corrija os seguintes erros:',

    // global crud - success / error notification bubbles
    'insert_success' => 'O item foi adicionado com sucesso.',
    'update_success' => 'O item foi modificado com sucesso.',

    // CRUD reorder view
    'reorder'                      => 'Reordenar',
    'reorder_text'                 => 'Use \'arrastar e soltar\' para ordenar.',
    'reorder_success_title'        => 'Feito',
    'reorder_success_message'      => 'A ordenação foi gravada.',
    'reorder_error_title'          => 'Erro',
    'reorder_error_message'        => 'A ordenação não foi gravada.',

    // CRUD yes/no
    'yes' => 'Sim',
    'no' => 'Não',

    // CRUD filters navbar view
    'filters' => 'Filtros',
    'toggle_filters' => 'Alternar filtros',
    'remove_filters' => 'Remover filtros',

    // Fields
    'browse_uploads' => 'Procurar uploads',
    'select_all' => 'Seleccionar todos',
    'select_files' => 'Seleccionar ficheiros',
    'select_file' => 'Seleccionar ficheiro',
    'clear' => 'Limpar',
    'page_link' => 'Link da página',
    'page_link_placeholder' => 'http://example.com/a-sua-pagina',
    'internal_link' => 'Link interno',
    'internal_link_placeholder' => 'Slug interno. Ex: \'admin/page\' (sem aspas) para \':url\'',
    'external_link' => 'Link externo',
    'choose_file' => 'Escolher ficheiro',

    //Table field
    'table_cant_add' => 'Não foi possível adicionar novo :entity',
    'table_max_reached' => 'Limite de :max itens atingido',

    // File manager
    'file_manager' => 'Gestor de ficheiros',
];
