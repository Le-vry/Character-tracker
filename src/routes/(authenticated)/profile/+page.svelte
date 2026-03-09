<script lang="ts">
  import { enhance } from '$app/forms';
  
  export let data: any;

  let previewUrl: string | null = null;

  function handleFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    previewUrl = URL.createObjectURL(files[0]);
  } else {
    previewUrl = null;
  }
  }

  function removePreview() {
  previewUrl = null;
  }

</script>

<div class="profile-container">
  <h1>Profile</h1>
  
  <div class="user-info">
  <p><strong>Name:</strong> {data.profile.username || 'N/A'}</p>
  <p><strong>Email:</strong> {data.profile?.email || 'N/A'}</p>
  </div>

  <div class="current-profile-picture">
    <h2>Current Profile Picture</h2>
  {#if data.profile?.profilePicture}
    <img src={data.profile.profilePicture} alt={data.profile.username} class="profile-image" />
    {:else}
      <p>No profile picture uploaded yet.</p>
    {/if}
  </div>

  <div class="upload-section">
    <h2>Upload New Profile Picture</h2>
    <form method="POST" action="?/upload" enctype="multipart/form-data" use:enhance>
      <input type="file" name="image" accept="image/*" on:change={handleFileChange} required />
      <button type="submit" on:submit={() => removePreview()}>Upload Image</button>
    </form>

    {#if previewUrl}
      <div class="preview">
        <h3>Preview</h3>
      <img src={previewUrl} alt="Preview" class="preview-image" />
      </div>
    {/if}
  </div>
</div>

<style>
  .profile-container {
    max-width: 680px;
    display: grid;
    gap: 1rem;
  }

  .user-info, .current-profile-picture, .upload-section {
    padding: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    background: #fff;
  }

  .preview {
    margin-top: 0.75rem;
  }

  button {
    padding: 0.45rem 0.7rem;
    border: 1px solid #d1d5db;
    background: #fff;
    border-radius: 0.35rem;
    cursor: pointer;
  }

  input[type="file"] {
    margin-right: 0.75rem;
    margin-bottom: 0.5rem;
    }

    .profile-image {
    max-width: 300px;
    max-height: 300px;
    border-radius: 0.35rem;
    }

    .preview-image {
    max-width: 200px;
    max-height: 200px;
    border-radius: 0.35rem;
    border: 1px solid #d1d5db;
    background: #fff;
  }
</style>