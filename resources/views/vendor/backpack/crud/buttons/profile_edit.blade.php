@if ($crud->hasAccess('update'))
<a href="{{ route('manager.profile.edit', $entry->id) }} " class="btn btn-xs btn-default"><i class="fa fa-edit"></i> Profile</a>
@endif
