<form action="{{ route('admin.jobs.create_as_manager', $entry->manager->id) }}" method="POST">
     @csrf
    <button class="btn btn-sm btn-link" type="submit"><i class="fa fa-edit"></i>Create Job Poster</button>
</form>
