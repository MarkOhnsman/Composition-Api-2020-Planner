import Vue from 'vue'
// REVIEW Must attach Composition API prior to using Reactive
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)


import { reactive } from '@vue/composition-api'
import { Organization } from './models/Organization'


// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
    profile: {},
    // NOTE Utilizing models we can now provide further intelisense through values
    /**@type {Organization[]} */
    organizations: [],
    myOrgIds: [],
    meetings: []
})

// NOTE Getters are used for repeated computeds 
export const Getters = {
    myOrganizations() {
        return AppState.organizations.filter(o => AppState.myOrgIds.find(mo => mo.organization == o.id))
    }
}