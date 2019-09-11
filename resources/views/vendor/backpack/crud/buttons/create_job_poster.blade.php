<form action="{{ route('admin.jobs.create_as_manager', $entry->id) }}" method="POST">
     @csrf
    <button class="btn btn-xs btn-default" type="submit"><i class="fa fa-edit"></i>Create Job Poster</button>
</form>