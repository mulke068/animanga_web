<template>
  <body class="bg-gray-100 dark:bg-gray-900 dark:text-white text-black min-h-screen p-4">
    <nav class="flex justify-between items-center py-4">
      <slot name="nav" />
    </nav>

    <main class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
      <slot />
    </main>
  </body>
</template>
