@if ($crud->hasAccess('update') && ($entry->recovery_codes))
<a href="{{ route('recovery_codes.generate', $entry->id) }} " target="_blank" class="btn btn-sm btn-link"><i class="fa fa-edit"></i>Generate Recovery Codes</a>
@endif
