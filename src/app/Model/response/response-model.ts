export class ResponseModel {
    statusCode?: number
    status?: string
    message: string | any;
    data?: string
    expiration?: object
    returnUrl?: string
    isSuccess?: boolean
    isAdmin?: boolean
    resetPassword: boolean | false | undefined
    fileRename?: string
    loginId?: string
    nameId?: number
    fullName?: string
    id?: number
}

export class ResponseResult {
    public StatusCode: number | any;
    public Status: string | any;
    public Message: string | any;
    public IsAdmin: boolean | any;
    public IsSuccess: boolean | any;
    public id: number | any;
}
