use crate::state::base_account::*;
use anchor_lang::prelude::*;

pub fn initialize(ctx: Context<Initialize>, bump: u8) -> Result<()> {
    let base_account = &mut ctx.accounts.base_account;
    base_account.trades = Vec::new();
    base_account.bump = bump;
    Ok(())
}

#[derive(Accounts)]
#[instruction(bump: u8)] 
pub struct Initialize<'info> {
    #[account(
        init, 
        seeds = [b"base_account", user.key().as_ref()], // Seed for deriving PDA
        bump, // Use the bump provided
        payer = user, 
        space = 8 + 1000
    )]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
