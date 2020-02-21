@if ($crud->hasAccess('update'))
<a href="{{ route('manager.profile.edit', $entry->manager->id) }} " target="_blank" class="btn btn-sm btn-link"><i class="fa fa-edit"></i>Edit Profile</a>
@endif
