@if ($crud->hasAccess('update') && ($entry->google2fa_secret))
<a href="{{ route('admin.recovery_codes.show') }}" target="_blank" class="btn btn-sm btn-link"><i class="fa fa-edit"></i>Generate Recovery Codes</a><br />
@endif
