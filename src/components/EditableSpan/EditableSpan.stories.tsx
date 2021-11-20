import React from 'react'
import { EditableSpan } from "./EditableSpan";
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions'


export default {
    component: EditableSpan,
    title: 'Components/EditableSpan',
} as Meta;

const callbackChangeTitle = action('Title was changed')

export const EditableSpanExample: React.VFC<{}> = () =>
    <EditableSpan
        title={"Start value"}
        onChangeTitle={callbackChangeTitle}
    />
