<template>
  <body class="antialiased text-slate-500 dark:text-slate-400 bg-gray-100 dark:bg-gray-900 dark:text-white text-black min-h-screen">
    <!-- Navigation -->
    <nav
      ref="nav"
      class="sticky top-0 left-0 mb-4 bg-white dark:bg-slate-900 z-10 transition-transform transform-gpu shadow-md"
      :class="{'-translate-y-full': isScrollingDown, 'translate-y-0': !isScrollingDown}"
    >
      <div class="relative">
        <div class="bg-white dark:bg-slate-900">
          <div class="flex flex-col md:justify-between gap-2 p-3 md:p-6">
            <!-- Menu -->
            <menu class="flex items-center gap-4">
              <slot name="nav" />
            </menu>
            <!-- Search Bar -->
            <div class="w-full mt-2 md:mt-0">
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

<script setup>
import { ref, onMounted } from 'vue'

const isScrollingDown = ref(false)
const isMobile = ref(false) // Detect mobile viewport
let lastScrollTop = 0

function handleScroll () {
  if (!isMobile.value) { return } // Only for mobile

  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Check if scrolling down
  isScrollingDown.value = currentScrollTop > lastScrollTop
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop // For Mobile or negative scrolling

  // Adjust nav visibility
  const nav = document.querySelector('nav')
  if (nav) {
    nav.classList.toggle('-translate-y-full', isScrollingDown.value)
    nav.classList.toggle('translate-y-0', !isScrollingDown.value)
  }
}

function checkIfMobile () {
  isMobile.value = window.innerWidth < 768 // Tailwind's breakpoint for mobile
}

onMounted(() => {
  checkIfMobile() // Initial check
  window.addEventListener('scroll', handleScroll)
})

</script>
