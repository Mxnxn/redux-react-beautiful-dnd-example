import React from "react";

import { Route, Redirect } from "react-router-dom";

export const ProtectiveRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			exact
			{...rest}
			render={(props) => {
				if (window.localStorage.getItem("session_token")) {
					return (
						<Component
							{...{ token: window.localStorage.getItem("session_token") }}
							{...props}
						/>
					);
				} else {
					return <Redirect to="/login" from={props.location} />;
				}
			}}
		/>
	);
};
