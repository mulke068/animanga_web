<!-- eslint-disable no-mixed-spaces-and-tabs -->
<template>
  <div class="container mx-auto p-4">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div v-if="status === 'success'" class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            User Profile
          </div>
          <h1 class="block mt-1 text-lg leading-tight font-medium text-black">
            {{ user.username }}
          </h1>
          <p class="mt-2 text-gray-500">
            {{ user.name.first }} {{ user.name.last }}
          </p>
          <p class="mt-2 text-gray-500">
            Email: {{ user.email }}
          </p>
          <p class="mt-2 text-gray-500">
            Status: <span :class="statusClass">{{ user.status ? 'Active' : 'Inactive' }}</span>
          </p>
          <p class="mt-2 text-gray-500">
            Role: {{ user.role }}
          </p>
          <div class="mt-4">
            <h2 class="text-sm font-semibold text-gray-700">
              Permissions
            </h2>
            <ul class="list-disc list-inside text-gray-500">
              <li>Create: {{ user.permission.create ? 'Yes' : 'No' }}</li>
              <li>Select: {{ user.permission.select ? 'Yes' : 'No' }}</li>
              <li>Update: {{ user.permission.update ? 'Yes' : 'No' }}</li>
              <li>Delete: {{ user.permission.delete ? 'Yes' : 'No' }}</li>
            </ul>
          </div>
          <div class="mt-4 text-sm text-gray-500">
            <p>Created at: {{ formattedDate(user.created_at) }}</p>
            <p>Updated at: {{ formattedDate(user.updated_at) }}</p>
          </div>
        </div>
        <div v-else class="p-8">
          <p class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Error loading user data.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      status: 'loading'
    }
  },
  async mounted () {
    try {
      const uid = localStorage.getItem('uid')
      if (uid.length > 0) {
        const data = await $fetch('/api/user/', {
          query: { uid }
        })
        if (data) {
          this.status = 'success'
          this.user = data
        } else {
          this.status = 'failed'
          console.error('No user data returned:', data)
        }
      } else {
        this.status = 'failed'
        console.error('No uid found in localStorage')
      }
    } catch (e) {
      this.status = 'failed'
      console.error('Error fetching user data:', e)
    }
  },
  methods: {
    formattedDate (dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    statusClass () {
      return this.user.status ? 'text-green-500' : 'text-red-500'
    }

  }
}
</script>
