<template>
  <body class="antialiased text-slate-500 dark:text-slate-400 bg-gray-100 dark:bg-gray-900 dark:text-white text-black min-h-screen">
    <!-- Navigation -->
    <nav class="sticky top-0 left-0 mb-4 bg-white dark:bg-slate-900 z-10">
      <div class="relative">
        <div class="bg-white dark:bg-slate-900">
          <div class="gap-2 p-3">
            <!-- Menu -->
            <menu class="flex items-center gap-4 p-6">
              <slot name="nav" />
            </menu>
            <!-- Search Bar -->
            <div class="w-full">
              <!-- <form action="" method="post" autocomplete="off" class="w-full"> -->
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >Search</label>
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <slot name="input" />

                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Search Results -->

    <main class="container mx-auto p-4 z-0">
      <slot />
    </main>
  </body>
</template>
