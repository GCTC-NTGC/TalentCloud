@if ($crud->hasAccess('update') && ($entry->google2fa_secret))
<form action="{{ route('admin.two_factor.deactivate') }}" method="POST">
    {{ csrf_field() }}
    <button class="btn btn-sm btn-link" type="submit"><i class="fa fa-edit"></i>Deactivate 2FA</button>
</form>
@endif
