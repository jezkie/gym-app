import React from 'react';
import { Message } from 'semantic-ui-react'

const MessageCommon = ({ success, error }) => {
    return (
        <div>
            {success ?
                <Message positive>
                    <Message.Header>Success</Message.Header>
                    {success}
                </Message>
                : error ?
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        {error}
                    </Message> : null
            }

        </div>
    );
};

export default MessageCommon; 