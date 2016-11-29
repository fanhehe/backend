function response(req, errName, data) {
    let userId;
    let returnContent;
    const msgBody = responseContentList();
    returnContent = msgBody[errName] || msgBody.default;

    if (!!data) returnContent.data = data;

    if (req.session) {
        req.session.nls == 'zh_cn' || !req.session.nls ?
        returnContent.msg = returnContent.msg.zh_cn :
        returnContent.msg = returnContent.msg.en_us;

    } else {
        returnContent.msg = returnContent.msg.zh_cn;
    }

    return returnContent;
}

function responseContentList() {
  return {
    default: {
        code: 500,
        msg: {
            zh_cn: '网络繁忙,请稍后再试',
            en_us: '',
      },
      description: 'Server internal error',
    },
    ok: {
      code: 200,
      msg: {
        zh_cn: '成功',
        en_us: 'ok',
      },
      description: 'Http request finish without mistake'
    },
    assets_no_exist: {
      code: 404,
      msg: {
        zh_cn: '您访问的资源不存在',
        en_us: ''
      },
      description: ''
    },
    server_error: {
      code: 500,
      msg: {
        zh_cn: '网络繁忙,请稍后再试',
        en_us: '',
      },
      description: 'Server internal error'
    },
    Inadequate_permissions: {
      code: 1000,
      msg: {
        zh_cn: '权限不足',
        en_us: ''
      }
    },
    format_error: {
      code: 2001,
      msg: {
        zh_cn: '输入数据格式错误',
        en_us: ''
      },
    },
    data_not_exist: {
      code: 2002,
      msg: {
        zh_cn: '数据不存在',
        en_us: ''
      }
    },
    user_not_login: {
      code: 2002,
      msg: {
        zh_cn: '用户未登陆',
        en_us: ''
      }
    },
    user_exist: {
      code: 2003,
      msg: {
        zh_cn: '账号已被使用',
        en_us: ''
      }
    },
    register_email_has_send: {
      code: 2004,
      msg: {
        zh_cn: '激活邮件已经发送',
        en_us: ''
      }
    },
    register_email_send_many_time: {
      code: 2005,
      msg: {
        zh_cn: '激活邮件发送次数过多',
        en_us: ''
      }
    },
    register_phone_code_error: {
      code: 2006,
      msg: {
        zh_cn: '验证码错误',
        en_us: ''
      }
    },
    link_error: {
      code: 2007,
      msg: {
        zh_cn: '无效连接',
        en_us: ''
      }
    },
    server_format_error: {
      code: 2010,
      msg: {
        zh_cn: '参数错误',
        en_us: ''
      },
    },
    high_operating_frequency: {
      code: 2011,
      msg: {
        zh_cn: '操作频率过高,请稍后再试',
        en_us: ''
      },
    },
    register_success: {
      code: 2050,
      msg: {
        zh_cn: '注册成功',
        en_us: ''
      }
    },
    phonenumber_used: {
      code: 2051,
      msg: {
        en_us: '',
        zh_cn: '手机号已被使用'
      },
    },
    user_not_exist: {
      code: 3001,
      msg: {
        en_us: '',
        zh_cn: '帐号不存在'
      },
    },
    gold_not_enough: {
      code: 3002,
      msg: {
        en_us: '',
        zh_cn: '用户金币不足'
      }
    },
    class_number_no_exsit: {
      code: 3003,
      msg: {
        en_us: '',
        zh_cn: '班级Id错误'
      }
    },
    have_join_class: {
      code: 3004,
      msg: {
        en_us: '',
        zh_cn: '你已加入班级,不能重复加入'
      }
    },
    multiple_user_nickname: {
      code: 3005,
      msg: {
        en_us: '',
        zh_cn: '昵称已存在请使用其它昵称'
      }
    },
    not_have_join_class: {
      code: 3006,
      msg: {
        en_us: '',
        zh_cn: '你未加入班级,不能解绑'
      }
    },
    wrong_password: {
      code: 3010,
      msg: {
        en_us: 'invalid login or password',
        zh_cn: '帐号密码错误'
      },
      description: 'wrong password'
    },
    not_level_invita_tribe_member: {
      code: 3011,
      msg: {
        zh_cn: '没有权限邀请成员',
        en_us: ''
      }
    },
    has_join_you_tribe: {
      code: 3012,
      msg: {
        zh_cn: '用户已经加入您的部落',
        en_us: ''
      }
    },
    not_level_delete_tribe_member: {
      code: 3013,
      msg: {
        zh_cn: '没有权限删除成员',
        en_us: ''
      }
    },
    can_not_multiple_attention_tribe: {
      code: 3014,
      msg: {
        zh_cn: '不能重复关注一个部落',
        en_us: ''
      }
    },
    not_attention_tribe: {
      code: 3015,
      msg: {
        zh_cn: '你还未关注',
        en_us: ''
      }
    },
    not_enough_level: {
      code: 3016,
      msg: {
        zh_cn: '权限不足',
        en_us: ''
      }
    },
    apply_not_process: {
      code: 3017,
      msg: {
        zh_cn: '请求已发送,请耐心等待对方处理',
        en_us: ''
      }
    },
    message_had_process_by_other: {
      code: 3018,
      msg: {
        zh_cn: '消息已经被其它管理员处理',
        en_us: ''
      }
    },
    can_not_add_work_multiple: {
      code: 3019,
      msg: {
        zh_cn: '无法重复添加作品',
        en_us: ''
      }
    },
    work_not_belong_to_you: {
      code: 3020,
      msg: {
        zh_cn: '你无权操作此作品',
        en_us: ''
      }
    },
    work_not_exsit_in_tribe: {
      code: 3021,
      msg: {
        zh_cn: '作品不在部落中',
        en_us: ''
      }
    },
    work_not_exsit: {
      code: 3023,
      msg: {
        zh_cn: '作品不存在',
        en_us: ''
      }
    },
    have_create_not_finish_tribe: {
      code: 3022,
      msg: {
        zh_cn: '您还有一个部落的信息没有完善,无法创建新部落',
        en_us: ''
      }
    },
    old_password_not_right: {
      code: 3024,
      msg: {
        zh_cn: '密码不正确',
        en_us: ''
      }
    },
    work_name_exist: {
      code: 3025,
      msg: {
        zh_cn: '作品名已经存在',
        en_us: ''
      }
    },
    has_team: {
      code: 3500,
      msg: {
        en_us: '',
        zh_cn: '你已经创建队伍,或在队伍中,无法创建新队伍'
      }
    },
    no_have_team: {
      code: 3550,
      msg: {
        en_us: '',
        zh_cn: '队伍不存在,或已经删除'
      }
    },
    beyond_team_limit: {
      code: 3600,
      msg: {
        en_us: '',
        zh_cn: '队伍已经满员,无法加入'
      }
    },
    no_signup_lesson: {
      code: 3601,
      msg: {
        en_us: '',
        zh_cn: '没有报名课程,不能请假'
      }
    },
    beyond_lesson_member_limit: {
      code: 3602,
      msg: {
        en_us: '',
        zh_cn: '名额已满'
      }
    },
    has_team_no_join: {
      code: 3650,
      msg: {
        en_us: '',
        zh_cn: '你已经创建队伍,或在队伍中,无法加入新队伍'
      }
    },
    has_team_can_not_create: {
      code: 3651,
      msg: {
        en_us: '',
        zh_cn: '你已经拥有队伍,无法创建新队伍'
      }
    },
    no_team_can_not_use_backpack: {
      code: 3652,
      msg: {
        en_us: '',
        zh_cn: '你没有战队,无法使用此功能'
      }
    },
    no_have_team_relation: {
      code: 3700,
      msg: {
        en_us: '',
        zh_cn: '没有找到队伍信息,请重试'
      }
    },
    no_level_invite_member: {
      code: 3750,
      msg: {
        en_us: '',
        zh_cn: '你没有权限要求队员'
      }
    },
    no_level_delete_member: {
      code: 3751,
      msg: {
        en_us: '',
        zh_cn: '你没有权限删除队员'
      }
    },
    team_name_used: {
      code: 3752,
      msg: {
        en_us: '',
        zh_cn: '战队名已被使用'
      }
    },
    member_not_exist: {
      code: 3751,
      msg: {
        en_us: '',
        zh_cn: '用户不在队伍中'
      }
    },
    reply_content_empty: {
      code: 4000,
      msg: {
        en_us: '',
        zh_cn: '回复内容不能为空'
      }
    },
    program_not_exist: {
      code: 4010,
      msg: {
        en_us: '',
        zh_cn: '程序不存在'
      }
    },
    praise_double: {
      code: 4020,
      msg: {
        en_us: '',
        zh_cn: '不能重复点赞'
      }
    },
    no_level_to_change_message: {
      code: 4030,
      msg: {
        en_us: '',
        zh_cn: '你没有权限操作本条消息'
      }
    },
    can_not_repeat_praise: {
      code: 4050,
      msg: {
        en_us: '',
        zh_cn: '无法重复点赞'
      }
    },
    fanfic_not_exist: {
      code: 4060,
      msg: {
        en_us: '',
        zh_cn: '小说不存在'
      }
    },
    program_save_success: {
      code: 5000,
      msg: {
        en_us: '',
        zh_cn: '保存成功'
      }
    },
    code_not_exist: {
      code: 5050,
      msg: {
        en_us: '',
        zh_cn: 'F码不存在'
      }
    },
    user_can_not_repeat_buy: {
      code: 5051,
      msg: {
        en_us: '',
        zh_cn: '您已经购买课程,不能重复购买'
      }
    },
    telephone_has_activation: {
      code: 5052,
      msg: {
        en_us: '',
        zh_cn: '手机号没有激活权限,或已使用'
      }
    },
    receive_duplicate: {
      code: 5053,
      msg: {
        en_us: '',
        zh_cn: '不能重复领取'
      }
    },
    lesson_not_pass: {
      code: 5054,
      msg: {
        en_us: '',
        zh_cn: '课程没有通过'
      }
    },
    lesson_one: {
      code: 5055,
      msg: {
        en_us: '',
        zh_cn: '这是第一课'
      }
    },
    get_sprite: {
      code: 5056,
      msg: {
        en_us: '',
        zh_cn: '这是第二课'
      }
    },
    lesson_no_have_access: {
      code: 5057,
      msg: {
        en_us: '',
        zh_cn: '课程暂未开通,无法使用'
      }
    },
    user_material_is_exist: {
      code: 10000,
      msg: {
        en_us: '',
        zh_cn: '添加的素材已存在'
      }
    },
    material_is_not_exist: {
      code: 10010,
      msg: {
        en_us: '',
        zh_cn: '素材不存在'
      }
    },
    comment_frequency_too_high: {
      code: 6000,
      msg: {
        en_us: '',
        zh_cn: '系统快被你刷蹦了哦,请手下留情'
      }
    },
    egg_exist: {
      code: 6100,
      msg: {
        en_us: '',
        zh_cn: '精灵已经存在,进化失败'
      }
    },
    wechat_binding_multiple_same_account: {
      code: 6200,
      msg: {
        en_us: '',
        zh_cn: '快上传语音或者图片作为你的新素材吧！'
      }
    },
    wechat_binding_multiple_different_account: {
      code: 6202,
      msg: {
        en_us: '',
        zh_cn: '该微信号已经绑定编程猫账号，同一个微信号不能绑定多个账号！'
      }
    },
    wechat_binding_multiple_other_wechat: {
      code: 6203,
      msg: {
        en_us: '',
        zh_cn: '该账号已被其他微信绑定过，无法再次绑定！'
      }
    },
    not_binding_wechat: {
      code: 6201,
      msg: {
        en_us: '',
        zh_cn: '暂未绑定微信,无法使用上传功能,点击右下方的"使用教程"查看使用方法'
      }
    },
    no_data: {
      code: 7001,
      msg: {
        en_us: '',
        zh_cn: '空数据'
      }
    },
  }
}
export default response;