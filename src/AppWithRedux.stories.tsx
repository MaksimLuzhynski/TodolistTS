import React from 'react'
import { AppWithRedux } from "./AppWithRedux";
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux';
import { store } from './state/store';
import { ReduxStoreProviderDecorator } from './stories/ReduxStorePviderDecorator';


export default {
    component: AppWithRedux,
    title: 'Components/AppWithRedux',
    decorators: [ReduxStoreProviderDecorator],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-actions',
        '@storybook/addon-essentials',
        '@storybook/addon-storysource',
        '@storybook/addon-docs',
    ],
    module: {
        rules: [
            {
                test: /\.stories\.tsx?$/,
                loaders: [
                    {
                        loader: require.resolve('@storybook/source-loader'),
                        options: { parser: 'typescript' },
                    },
                ],
                enforce: 'pre',
            },
        ],
    }
} as Meta;

const callbackChangeTitle = action('Title was changed')

export const AppWithReduxExample: React.VFC<{}> = () => <AppWithRedux />
