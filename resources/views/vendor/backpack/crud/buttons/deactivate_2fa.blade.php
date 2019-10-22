@if ($crud->hasAccess('update') && ($entry->google2fa_secret))
<a href="{{ route('two_factor.deactivate', $entry->id) }} " target="_blank" class="btn btn-sm btn-link"><i class="fa fa-edit"></i>Deactivate 2FA</a>
@endif
