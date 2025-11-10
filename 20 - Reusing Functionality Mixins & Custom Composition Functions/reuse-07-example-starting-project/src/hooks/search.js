import { ref, computed, watch } from 'vue';

export default function useSearch(items, searchProp) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(function () {
    let filteredItems = [];
    if (activeSearchTerm.value) {
      filteredItems = items.value.filter((item) =>
        item[searchProp]
          .toLowerCase()
          .includes(activeSearchTerm.value.toLowerCase())
      );
    } else if (items.value) {
      filteredItems = items.value;
    }
    return filteredItems;
  });

  watch(enteredSearchTerm, function (newValue) {
    setTimeout(() => {
      if (newValue.toLowerCase() === enteredSearchTerm.value.toLowerCase()) {
        activeSearchTerm.value = newValue.toLowerCase();
      }
    }, 300);
  });

  function updateSearch(val) {
    enteredSearchTerm.value = val.toLowerCase();
  }

  return {
    enteredSearchTerm,
    availableItems,
    updateSearch,
  };
}
