import { ref } from "vue";
export default function path() {
  const steps = ref([
    { no: 1, step: "STEP 1", name: "Your Info", to: "/", isPath: true },
    { no: 2, step: "STEP 2", name: "Select Plan", to: "/plan", isPath: false },
    { no: 3, step: "STEP 3", name: "Add-ons", to: "/addons", isPath: false },
    { no: 4, step: "STEP 4", name: "Summary", to: "/summary", isPath: false },
  ]);
  const currentRoute = window.location.pathname;
  steps.value.forEach((step) =>
    step.to !== currentRoute ? (step.isPath = false) : (step.isPath = true)
  );
  return { steps };
}
