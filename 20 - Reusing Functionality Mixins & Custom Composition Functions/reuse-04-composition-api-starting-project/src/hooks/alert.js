import { ref } from 'vue';

export default function useAlert() {
  const alertIsVisible = ref(false);

  function showAlert() {
    alertIsVisible.value = true;
  }
  function hideAlert() {
    alertIsVisible.value = false;
  }

  //you can return whatever, an object or an array
  return [alertIsVisible, showAlert, hideAlert];
}
