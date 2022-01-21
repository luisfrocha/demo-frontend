<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
  import { ref } from 'vue';
  import { XIcon, MenuIcon } from '@heroicons/vue/solid';
  import { useRoute } from 'vue-router';
  import { routes } from './router';

  const route = useRoute();

  const navigation = ref(
    routes
      .map(route =>
        route.children && !route.path
          ? route.children.map(child => ({ name: child.name, to: child.path }))
          : { name: route.name, to: route.path }
      )
      .flat()
  );
</script>
<template>
  <div class="min-h-full">
    <div class="bg-gray-500 pb-32">
      <Disclosure
        as="nav"
        class="bg-gray-500 border-b border-gray-400 border-opacity-25 lg:border-none"
        v-slot="{ open }"
      >
        <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div
            class="relative h-16 flex items-center justify-between lg:border-b lg:border-gray-300 lg:border-opacity-25"
          >
            <div class="px-2 flex items-center lg:px-0">
              <div class="flex-shrink-0">
                <img
                  class="block h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-gray-300.svg"
                  alt="Workflow"
                />
              </div>
              <div class="hidden lg:block lg:ml-10">
                <div class="flex space-x-4">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.to"
                    :class="[
                      item.to === route.fullPath
                        ? 'bg-gray-700 text-white'
                        : 'text-white hover:bg-gray-500 hover:bg-opacity-75',
                      'rounded-md py-2 px-3 text-sm font-medium',
                    ]"
                    :aria-current="item.to === route.fullPath ? 'page' : undefined"
                  >
                    {{ item.name }}
                  </router-link>
                </div>
              </div>
            </div>
            <div class="flex lg:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="bg-gray-500 p-2 rounded-md inline-flex items-center justify-center text-gray-200 hover:text-white hover:bg-gray-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-white"
              >
                <span class="sr-only">Open main menu</span>
                <XIcon v-if="open" class="block h-6 w-6" aria-hidden="true" />
                <MenuIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel class="lg:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.to"
              :class="[
                item.to === route.fullPath
                  ? 'bg-gray-700 text-white'
                  : 'text-white hover:bg-gray-500 hover:bg-opacity-75',
                'block rounded-md py-2 px-3 text-base font-medium',
              ]"
              :aria-current="item.to === route.fullPath ? 'page' : undefined"
            >
              {{ item.name }}
            </DisclosureButton>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <header class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-white">{{ route.meta.title }}</h1>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6 graph-container-div">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>
