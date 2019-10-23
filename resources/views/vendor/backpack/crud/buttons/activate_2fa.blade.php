@if ($crud->hasAccess('update') && !($entry->google2fa_secret))
<a href="{{ route('admin.two_factor.activate') }}" target="_blank" class="btn btn-sm btn-link"><i class="fa fa-edit"></i>Activate 2FA</a>
@endif
