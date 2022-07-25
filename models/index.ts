import { types } from 'mobx-state-tree';

export const model = types.model({
    categories: types.array(types.string)
}).actions((self) => {
    return {
        setCategories(categories: string[]) {
            self.categories.replace(categories)
        }
    }
})