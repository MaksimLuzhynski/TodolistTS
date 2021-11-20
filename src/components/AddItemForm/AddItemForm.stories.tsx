import React from 'react'
import { AddItemForm } from "./AddItemForm";
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions'


export default {
    component: AddItemForm,
    title: 'Components/AddItemForm',
} as Meta;

const callback = action('Button "Add" was pressed inside the form.')

export const AddItemFormExample: React.VFC<{}> = () => <AddItemForm addItem={callback} />;

