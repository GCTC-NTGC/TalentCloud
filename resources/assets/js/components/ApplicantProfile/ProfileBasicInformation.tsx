import React, { FunctionComponent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { myBasicInformationMessages } from "../Application/applicationMessages";

export interface ProfileBasicInformationProps {

  }

export const ProfileBasicInformation: React.FC<ProfileBasicInformationProps> = ({

  }) => {
    const intl = useIntl();

    return (
        <>
            <div>
                <h2 data-c-heading="h2" data-c-margin="bottom(1)">
                    {intl.formatMessage(myBasicInformationMessages.heading)}
                </h2>
                <p data-c-margin="bottom(1)">
                    <FormattedMessage
                        id="profile.experience.preamble"
                        defaultMessage="This profile is also shared when you submit a job application."
                        description="First section of text on the 'My Basic Information' of the Application Timeline."
                    />
                </p>
                <div data-c-input="select" data-c-grid-item="base(1of1)">
                    <label>Citizenship Status:</label>
                    <div>
                            <i className="fas fa-caret-down"></i>
                            <select id="contact_language" name="contact_language" required>
                                    <option>Sample Option</option>
                            </select>
                    </div>
                </div>
            </div>
        </>
    );
  };



export default ProfileBasicInformation;
