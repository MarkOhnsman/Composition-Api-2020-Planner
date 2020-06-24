import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)


import { reactive } from '@vue/composition-api'
import { Organization } from './models/Organization'

export const AppState = reactive({
    profile: {},
    /**@type {Organization[]} */
    organizations: [],
    myOrgIds: [],
    meetings: []
})


export const Getters = {
    myOrganizations() {
        return AppState.organizations.filter(o => AppState.myOrgIds.find(mo => mo.organization == o.id))
    }
}