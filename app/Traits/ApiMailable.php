<?php

namespace App\Traits;

/**
 * This trait can be used on a Mailable class to get the mailable's plain text,
 * or for converting to an array that might be returned in an API request.
 */
trait ApiMailable
{
    public function getPlainText()
    {
        $this->build();
        return $this->buildView()['text']->toHtml();
    }

    public function toArray()
    {
        $this->build();
        $mail = $this;
        return [
            'from' => $mail->from,
            'to' => $mail->to,
            'cc' => $mail->cc,
            'bcc' => $mail->bcc,
            'subject' => $mail->subject,
            'body' => $mail->getPlainText(),
        ];
    }
}
