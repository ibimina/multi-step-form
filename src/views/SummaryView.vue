<script setup>
import RegForm from "../components/RegForm.vue";
import SelectButton from "../components/SelectButton.vue";
import path from "../path";
path();
const plan = JSON.parse(localStorage.getItem("plan"));
const addon = JSON.parse(localStorage.getItem("addons"));
console.log(plan, addon);
</script>

<template>
  <SelectButton />
  <RegForm
    title="Finishing up"
    subtitle="Double check everything looks OK before confirming."
  >
    <div>
      <div>
        <div>
          <div>
            <p>Arcade(Monthly)</p>
            <p>Change</p>
          </div>
          <p>$9/mo</p>
        </div>
        <div>
          <p>online service <span>+$2/mo</span></p>
          <p>Larger storage <span>+$2/mo</span></p>
        </div>
      </div>
      <p>Total () <span></span></p>
    </div>
    <button>confirm</button>
  </RegForm>
</template>
