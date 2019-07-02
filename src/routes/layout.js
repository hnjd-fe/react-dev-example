import React from 'react'
import Loadable from "react-loadable"
import Layout from 'components/BaseLayout'

// default
const defaultLoad = () => <div className="defaultLoad"/>

const Home = () => import('pages/Home/Home')
const Setting = () => import('pages/Setting/Setting')

let layout = {
		path: '/admin',
		component: Layout,
		routes: [
			// home
			{
				path: '/admin/home/homePage',
				component: Loadable({
					loader: Home,
					loading: defaultLoad
				}),
			},
			{
				path: '/admin/home/setting',
				component: Loadable({
					loader: Setting,
					loading: defaultLoad
				}),
			}
		]
	}

export default layout